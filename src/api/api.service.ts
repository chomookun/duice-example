import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import * as path from 'path';
import { v4 } from 'uuid';
import {MongoClient} from "mongodb";
import {MongoMemoryServer} from "mongodb-memory-server";

@Injectable()
export class ApiService {

    private mongoServer: MongoMemoryServer;

    private mongoClient;

    private db;

    async onModuleInit() {
        this.mongoServer = await MongoMemoryServer.create({
            instance: {
                dbName: 'test',
                storageEngine: 'wiredTiger',
                args: ['--nojournal', '--nssize=1', '--smallfiles']
            },
            binary: {
                version: '4.0.3',
                checkMD5: false
            }
        });
        this.mongoClient= new MongoClient(this.mongoServer.getUri());
        await this.mongoClient.connect();
        this.db = this.mongoClient.db();
        // inserts users
        await this.db.collection('users').insertMany(ApiService.getJsonFromFile('users'));
    }

    private static getJsonFromFile(name: string) {
        try {
            const usersFilePath = path.join(process.cwd(), 'data', `${name}.json`);
            const usersJson = fs.readFileSync(usersFilePath, 'utf-8');
            return JSON.parse(usersJson);
        } catch (e) {
            throw e;
        }
    }

    async forceToDelay(millis: number): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, millis));
    }

    async getUsers(search: object, size?: number, page?: number): Promise<object[]> {
        await this.forceToDelay(1_000);
        console.debug('search', search);
        const filter: any = {};
        if (search['name']) {
            filter.name = { $regex: `.*${search['name']}.*`, $options: 'i' };
        }
        if (search['email']) {
            filter.email = { $regex: `.*${search['email']}.*`, $options: 'i' };
        }
        if (search['groupId']) {
            filter.groupId = { $eq: search['groupId'] };
        }
        if (search['active']) {
            filter.active = { $eq: Boolean(search['active']) };
        }
        console.debug('filter', filter);
        const offset: number = Number(size * page);
        const limit: number = Number(size);
        const usersCollection = await this.db.collection('users');
        return await usersCollection.find(filter)
            .sort({_id: -1})
            .skip(offset)
            .limit(limit)
            .toArray();
    }

    async getUser(id: string): Promise<object> {
        await this.forceToDelay(100);
        const usersCollection = await this.db.collection('users');
        return usersCollection.findOne({id:id});
    }

    async saveUser(user: object): Promise<object> {
        await this.forceToDelay(1_000);
        const usersCollection = await this.db.collection('users');
        let targetUser = await usersCollection.findOne({id:user['id']});
        if (!targetUser) {
            user['id'] = v4();
            await usersCollection.insertOne(user);
        } else {
            // Object.assign(targetUser, user);
            for (let key in user) {
                if (key !== '_id') {
                    targetUser[key] = user[key];
                }
            }
            await usersCollection.updateOne({id:targetUser.id},{$set:targetUser});
        }
        return user;
    }

    async deleteUser(id: string): Promise<void> {
        await this.forceToDelay(1_000);
        const usersCollection = await this.db.collection('users');
        usersCollection.deleteOne({id: id});
    }

}
