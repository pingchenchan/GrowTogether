import { createServer, Response } from 'miragejs';
import { Challenge, Checkin } from '../types';

const seedData = {
  challenges: [
    {
      id: '1',
      title: '每日閱讀',
      frequency: 'daily',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: '每週運動',
      frequency: 'weekly',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: '每日冥想',
      frequency: 'daily',
      createdAt: new Date().toISOString(),
    },
  ],
  checkins: [
    {
      id: '1',
      challengeId: '1',
      note: '今天讀了30分鐘',
      imageUrl: null,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      challengeId: '1',
      note: '讀完一本書',
      imageUrl: null,
      createdAt: new Date().toISOString(),
    },
  ],
};

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    seeds(server) {
      server.db.loadData(seedData);
    },

    routes() {
      this.namespace = 'api';

      // 獲取所有挑戰
      this.get('/challenges', (schema) => {
        return schema.db.challenges;
      });

      // 創建新挑戰
      this.post('/challenges', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const challenge = {
          id: String(schema.db.challenges.length + 1),
          ...attrs,
          createdAt: new Date().toISOString(),
        };
        schema.db.challenges.insert(challenge);
        return challenge;
      });

      // 獲取挑戰詳情
      this.get('/challenges/:id', (schema, request) => {
        const id = request.params.id;
        return schema.db.challenges.find(id);
      });

      // 獲取挑戰的打卡記錄
      this.get('/challenges/:id/checkins', (schema, request) => {
        const challengeId = request.params.id;
        return schema.db.checkins.where({ challengeId });
      });

      // 創建打卡記錄
      this.post('/checkins', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const checkin = {
          id: String(schema.db.checkins.length + 1),
          ...attrs,
          createdAt: new Date().toISOString(),
        };
        schema.db.checkins.insert(checkin);
        return checkin;
      });
    },
  });

  return server;
} 