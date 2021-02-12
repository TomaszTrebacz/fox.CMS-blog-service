import { PostI } from '../../models/post.interface';
import { UpdateResult } from 'typeorm';
import { isArrayFound, isExecuted, isFound } from './database.util';

describe('isExecuted', () => {
  describe('if row is actually uptaded', () => {
    it('should return nothing', () => {
      const resQuery: UpdateResult = {
        raw: {},
        affected: 1,
        generatedMaps: [],
      };

      expect(isExecuted(resQuery)).toEqual(undefined);
    });
  });
  describe('otherwise', () => {
    it('should throw an error', () => {
      const resNotExecutedQuery: UpdateResult = {
        raw: {},
        affected: 0,
        generatedMaps: [],
      };

      try {
        isExecuted(resNotExecutedQuery);
      } catch (err) {
        expect(err.message).toEqual('Database/ORM error.');
      }
    });
  });
});

describe('isArrayFound', () => {
  describe('if rows exist', () => {
    it('should return noting', () => {
      const res: PostI[] = [
        {
          id: 1,
          title: 'title',
          text: 'Body of the post',
          imageUrl: 'https://www.link.com/pathToImage',
          category: 1,
          userId: '55a1a5be-d03b-48bf-b028-47618cf5b734',
          created: new Date(),
          updated: new Date(),
        },
      ];

      expect(isArrayFound(res)).toEqual(undefined);
    });
  });
  describe('otherwise', () => {
    it('should throw an error', () => {
      const res = undefined;

      try {
        isArrayFound(res);
      } catch (err) {
        expect(err.message).toEqual('Can not find any data.');
      }
    });
  });
});

describe('isFound', () => {
  describe('if row exists', () => {
    it('should return noting', () => {
      const res: PostI = {
        id: 1,
        title: 'title',
        text: 'Body of the post',
        imageUrl: 'https://www.link.com/pathToImage',
        category: 1,
        userId: '55a1a5be-d03b-48bf-b028-47618cf5b734',
        created: new Date(),
        updated: new Date(),
      };

      expect(isFound(res, 'Can not find user.')).toEqual(undefined);
    });
  });
  describe('otherwise', () => {
    it('should throw an error', () => {
      const res = undefined;

      try {
        expect(isFound(res, 'Can not find user.'));
      } catch (err) {
        expect(err.message).toEqual('Can not find user.');
      }
    });
  });
});
