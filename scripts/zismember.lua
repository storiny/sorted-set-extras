local score = redis.call('ZSCORE', KEYS[1], ARGV[1])

if (score) then
  return 1
else
  return nil
end
