# sorted-set-extras
This repository contains an extended range of sorted set commands for Redis written in Lua. Commands are registered through the [ioredis](https://www.npmjs.com/package/ioredis) redis client.

## Commands

### zaddTs
Adds a member to a sorted set with the current timestamp as the score for the member.

#### Syntax
```js
client.zaddTs(key, member);
```

#### Time complexity
Same as `zadd` which is used internally, O(log(N)) for each item added, where N is the number of elements in the sorted set.

#### Return
Integer reply.

### zismember
Checks if an entity is a member of a sorted set, added using the `zaddTs` command. Similar to `sismember` but only works for members added with the `zaddTs` command.

#### Syntax
```js
client.zismember(key, member);
```

#### Time complexity
O(1)

#### Return
Integer if the entity is a valid member, `null` otherwise. Can be safely cast to boolean.

### zremrangebyscoreTs
Removes all the members in a sorted set older than the specified date. Works only with sets having members added using the `zaddTs` command.

#### Syntax
```js
client.zremrangebyscoreTs(key, timestamp);
```

#### Time complexity
Same as `zremrangebyscore` which is used internally, O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements removed by the operation.

#### Return
Integer reply, the number of members removed.
