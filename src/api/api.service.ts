import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import * as path from 'path';
import { v4 } from 'uuid';
import {MongoMemoryServer} from "mongodb-memory-server";
import * as mongoose from "mongoose";
import {MongoClient} from "mongodb";

@Injectable()
export class ApiService {

    users: object[] = [];

    private lock: boolean = false;

    private mongoServer: MongoMemoryServer;

    private mongoClient;

    private db;

    async onModuleInit() {
        this.mongoServer = await MongoMemoryServer.create();
        this.mongoClient= new MongoClient(this.mongoServer.getUri());
        await this.mongoClient.connect();
        this.db = this.mongoClient.db();
        // inserts users
        this.db.collection('users').insertMany(ApiService.getJsonFromFile('users'));
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

    async getUsers(search: object, size?: number, page?: number): Promise<object[]> {
        const filter: any = {};
        if (search['username']) {
            filter.username = { $regex: `.*${search['username']}.*`, $options: 'i' };
        }
        if (search['email']) {
            filter.email = { $regex: `.*${search['email']}.*`, $options: 'i' };
        }
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
        const usersCollection = await this.db.collection('users');
        return usersCollection.findOne({id:id});
    }

    async saveUser(user: object): Promise<object> {
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
        const usersCollection = await this.db.collection('users');
        usersCollection.deleteOne({id: id});
    }

}
