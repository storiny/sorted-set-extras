return redis.call('ZREMRANGEBYSCORE', KEYS[1], '-inf', ARGV[1])
