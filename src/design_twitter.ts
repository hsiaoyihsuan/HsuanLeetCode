// 355. Design Twitter
/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */

// Sorting
class Twitter {
  private users: Map<
    number,
    {tweets: {id: number; time: number}[]; followees: Set<number>}
  >;
  private tweetCount: number;

  constructor() {
    this.users = new Map();
    this.tweetCount = 0;
  }

  postTweet(userId: number, tweetId: number): void {
    if (!this.users.has(userId)) {
      this.users.set(userId, {tweets: [], followees: new Set()});
    }
    const user = this.users.get(userId)!;
    user.tweets.push({id: tweetId, time: this.tweetCount++});
  }

  getNewsFeed(userId: number): number[] {
    if (!this.users.has(userId)) return [];

    const user = this.users.get(userId)!;
    let tweets = user.tweets;
    for (const followeeId of user.followees) {
      if (this.users.has(followeeId)) {
        const followee = this.users.get(followeeId)!;
        tweets = tweets.concat(followee.tweets);
      } else {
        continue;
      }
    }

    return tweets
      .sort((a, b) => b.time - a.time)
      .slice(0, 10)
      .map((tweet) => tweet.id);
  }

  follow(followerId: number, followeeId: number): void {
    if (!this.users.has(followerId)) {
      this.users.set(followerId, {tweets: [], followees: new Set()});
    }
    const user = this.users.get(followerId)!;
    user.followees.add(followeeId);
  }

  unfollow(followerId: number, followeeId: number): void {
    if (this.users.has(followerId)) {
      const user = this.users.get(followerId)!;
      user.followees.delete(followeeId);
    }
  }
}

import {MaxPriorityQueue} from "@datastructures-js/priority-queue";
class Twitter2 {
  private userPost: Map<number, [number, number][]>;
  private userFollow: Map<number, Set<number>>;
  private time: number;

  constructor() {
    this.userPost = new Map();
    this.userFollow = new Map();
    this.time = 0;
  }

  postTweet(userId: number, tweetId: number): void {
    if (!this.userPost.has(userId)) this.userPost.set(userId, []);

    this.userPost.get(userId)!.push([this.time++, tweetId]);
  }

  getNewsFeed(userId: number): number[] {
    if (!this.userFollow.has(userId)) this.userFollow.set(userId, new Set());

    this.userFollow.get(userId)!.add(userId);

    // [time, tweetId, followeeId, currentIndex]
    const maxHeap = new MaxPriorityQueue<[number, number, number, number]>(
      (item) => item[0]
    );

    for (const followeeId of this.userFollow.get(userId)!) {
      const tweets = this.userPost.get(followeeId);
      if (tweets && tweets.length > 0) {
        const index = tweets.length - 1;
        const [time, tweetId] = tweets.at(-1)!;
        maxHeap.push([time, tweetId, followeeId, index]);
      }
    }

    const result: number[] = [];

    while (maxHeap.size() > 0 && result.length < 10) {
      const [time, tweetId, followeeId, index] = maxHeap.pop()!;
      result.push(tweetId);

      if (index - 1 >= 0) {
        const tweets = this.userPost.get(followeeId)!;
        const [time, tweetId] = tweets[index - 1];
        maxHeap.push([time, tweetId, followeeId, index - 1]);
      }
    }

    return result;
  }

  follow(followerId: number, followeeId: number): void {
    if (!this.userFollow.has(followerId))
      this.userFollow.set(followerId, new Set());

    this.userFollow.get(followerId)!.add(followeeId);
  }

  unfollow(followerId: number, followeeId: number): void {
    if (this.userFollow.has(followerId)) {
      this.userFollow.get(followerId)!.delete(followeeId);
    }
  }
}
