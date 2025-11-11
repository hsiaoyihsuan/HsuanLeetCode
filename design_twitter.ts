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
  private users: Map<
    number,
    {
      tweets: {id: number; time: number}[];
      followees: Set<number>;
    }
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
    const maxHeap = new MaxPriorityQueue<{id: number; time: number}>(
      (tweet) => tweet.time
    );
    for (const tweet of user.tweets) {
      maxHeap.enqueue(tweet);
    }

    for (const followeeId of user.followees) {
      if (this.users.has(followeeId)) {
        const followee = this.users.get(followeeId)!;
        followee.tweets.forEach((tweet) => maxHeap.enqueue(tweet));
      }
    }

    const feed: number[] = [];
    while (maxHeap.size() > 0 && feed.length < 10) {
      const {id} = maxHeap.dequeue()!;
      feed.push(id);
    }
    return feed;
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
