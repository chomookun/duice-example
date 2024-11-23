import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import * as path from 'path';
import { v4 } from 'uuid';

@Injectable()
export class ApiService {

    users: object[] = [];

    private lock: boolean = false;

    async onModuleInit() {
        const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
        if (fs.existsSync(usersFilePath)) {
            const usersJson = fs.readFileSync(usersFilePath, 'utf-8');
            this.users = JSON.parse(usersJson);
        } else {
            console.log('users.json file not found!');
        }
    }

    private async withLock(callback: Function) {
        while (this.lock) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        this.lock = true;
        try {
            await callback();
        } finally {
            this.lock = false;
        }
    }

    async getUsers(search: object, size?: number, page?: number): Promise<object[]> {
        let users;
        let offset = size * page;
        let limit = size;
        console.log("offset,limit", offset, limit);
        await this.withLock(async () => {
            users = this.users.slice(offset, (offset + limit) + 1);
        });
        return users;
    }

    async getUser(id: string): Promise<object> {
        let user;
        await this.withLock(async() => {
            user = this.users.find(user => user['id'] === id);
        });
        return user || null;
    }

    async saveUser(user: object): Promise<object> {
        await this.withLock(async() => {
            const id = user['id'];
            if (id) {
                this.users.filter(it => it['id'] === id)
                    .map(it => {
                        Object.assign(it, user);
                    });
            } else {
                user['id'] = v4().replace(/-/g, '');
                this.users.unshift(user);
            }
        });
        return user;
    }

    deleteUser(id: string): void {
        const index = this.users.findIndex(it => it['id'] === id);
        if (index > -1) {
            this.users.splice(index, 1);
        }
    }

}
