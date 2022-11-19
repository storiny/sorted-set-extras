local TIME = redis.call('TIME')
return redis.call('ZADD', KEYS[1], TIME[1], ARGV[1])
