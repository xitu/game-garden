package com.wjbgn.gobang.server.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.BoundSetOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.script.DefaultRedisScript;

import java.time.Duration;
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * description: Redis 工具类
 *
 * @author: weirx
 * @time: 2021/3/26 13:26
 */
@Configuration
public class RedisUtil {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    /**
     * 消息发布
     *
     * @param channel
     * @param message
     * @return void
     * @author weirx
     * @date: 2022/3/22
     */
    public void publish(String channel, Object message) {
        this.redisTemplate.convertAndSend(channel, message);
    }

    /**
     * 在字符串后边追加 字符串
     *
     * @param key
     * @param appendValue
     * @return
     */
    public ValueOperations<String, Object> append(String key, String appendValue) {
        ValueOperations<String, Object> operations = this.redisTemplate.opsForValue();
        operations.append(key, appendValue);
        return operations;
    }

    /**
     * 缓存Object
     *
     * @param key   缓存的健值
     * @param value 缓存的值
     * @return 缓存的对象
     */
    public ValueOperations<String, Object> setObject(String key, Object value) {
        ValueOperations<String, Object> operations = this.redisTemplate.opsForValue();
        operations.set(key, value);
        return operations;
    }

    /**
     * 缓存Object，设置过期时间，自定义时间粒度
     *
     * @param key      缓存的健值
     * @param value    缓存的值
     * @param timeout  时间
     * @param timeUnit 时间颗粒度
     * @return 缓存的对象
     */
    public ValueOperations<String, Object> setObjectExpire(String key, Object value, Integer timeout, TimeUnit timeUnit) {
        ValueOperations<String, Object> operations = this.redisTemplate.opsForValue();
        operations.set(key, value, timeout, timeUnit);
        return operations;
    }

    /**
     * 缓存Object，设置过期时间，时间粒度为毫秒
     *
     * @param key     缓存的健值
     * @param value   缓存的值
     * @param timeout 时间
     * @return 缓存的对象
     */
    public ValueOperations<String, Object> setObjectExpire(String key, Object value, Duration timeout) {
        ValueOperations<String, Object> operations = this.redisTemplate.opsForValue();
        operations.set(key, value, timeout);
        return operations;
    }

    /**
     * 获得缓存对象。
     *
     * @param key 缓存键值
     * @return 缓存键值对应的数据
     */
    public Object getObject(String key) {
        ValueOperations<String, Object> operation = this.redisTemplate.opsForValue();
        return operation.get(key);
    }

    /**
     * 获得缓存字符串。
     *
     * @param key 缓存键值
     * @return 缓存键值对应的数据
     */
    public String getString(String key) {
        ValueOperations<String, Object> operation = this.redisTemplate.opsForValue();
        return operation.get(key) == null ? "" : operation.get(key).toString();
    }

    /**
     * 设置过期时间
     *
     * @param key      key值
     * @param timeout  时间
     * @param timeUnit 时间单位
     * @return
     */
    public Boolean setExpire(String key, Long timeout, TimeUnit timeUnit) {
        return this.redisTemplate.expire(key, timeout, timeUnit);
    }

    /**
     * 删除单个对象
     *
     * @param key
     */
    public Boolean deleteObject(String key) {
        return this.redisTemplate.delete(key);
    }

    /**
     * 删除集合对象
     *
     * @param collection
     */
    public void deleteObject(Collection<String> collection) {
        this.redisTemplate.delete(collection);
    }

    /**
     * 缓存List数据
     *
     * @param key      缓存的键值
     * @param dataList 待缓存的List数据
     * @return 缓存的对象
     */
    public ListOperations<String, Object> setList(String key, List<Object> dataList) {
        ListOperations<String, Object> stringObjectListOperations = this.redisTemplate.opsForList();
        int size = dataList.size();
        for (int i = 0; i < size; i++) {
            stringObjectListOperations.leftPush(key, dataList.get(i));
        }
        return stringObjectListOperations;
    }

    /**
     * 获得缓存的list对象
     *
     * @param key 缓存的键值
     * @return 缓存键值对应的数据
     */
    public List<Object> getList(String key) {
        List<Object> dataList = new ArrayList<>();
        ListOperations<String, Object> listOperations = this.redisTemplate.opsForList();
        Long size = listOperations.size(key);
        for (long i = 0; i < size; i++) {
            dataList.add(listOperations.index(key, i));
        }
        return dataList;
    }

    /**
     * 缓存Set
     *
     * @param key     缓存键值
     * @param dataSet 缓存的数据
     * @return 缓存数据的对象
     */
    public BoundSetOperations<String, Object> setSet(String key, Set<Object> dataSet) {
        BoundSetOperations<String, Object> setOperations = this.redisTemplate.boundSetOps(key);
        Iterator<Object> iterable = dataSet.iterator();
        while (iterable.hasNext()) {
            setOperations.add(iterable.next());
        }
        return setOperations;
    }

    /**
     * 获得缓存的set
     *
     * @param key
     * @return
     */
    public Set<Object> getSet(String key) {
        Set<Object> dataSet = new HashSet<>();
        BoundSetOperations<String, Object> setOperations = this.redisTemplate.boundSetOps(key);
        Long size = setOperations.size();
        for (long i = 0; i < size; i++) {
            dataSet.add(setOperations.pop());
        }
        return dataSet;
    }

    /**
     * 缓存Map
     *
     * @param key
     * @param dataMap
     * @return
     */
    public void setHash(String key, Map<String, Object> dataMap) {
        this.redisTemplate.opsForHash().putAll(key, dataMap);
    }

    /**
     * 在hash中新增一个值
     *
     * @param key
     * @param field
     * @param value
     */
    public void setFieldToHash(String key, String field, Object value) {
        this.redisTemplate.opsForHash().put(key, field, value);
    }

    /**
     * 当field不存在时put
     *
     * @param key
     * @param field
     * @param value
     */
    public void setFieldToHashIfAbsent(String key, String field, Object value) {
        this.redisTemplate.opsForHash().putIfAbsent(key, field, value);
    }

    /**
     * 获得缓存的Map
     *
     * @param key
     * @return
     */
    public Map<Object, Object> getHash(String key) {
        return this.redisTemplate.opsForHash().entries(key);
    }

    /**
     * 获取键值为key的hash中的field字段的值
     *
     * @param key
     * @param field
     */
    public Object getHashField(String key, String field) {
        return this.redisTemplate.opsForHash().get(key, field);
    }

    /**
     * 获取键值为key的hash表中所有字段
     *
     * @param key
     */
    public Set<Object> getAllFieldsName(String key) {
        return this.redisTemplate.opsForHash().keys(key);
    }

    /**
     * 获取键值为key的hash表中所有value
     *
     * @param key
     */
    public List<Object> getAllValues(String key) {
        return this.redisTemplate.opsForHash().values(key);
    }

    /**
     * 给hash表中指定字段（整形）增加increment
     */
    public Long setHashIncrement(String key, String field, long increment) {
        return this.redisTemplate.opsForHash().increment(key, field, increment);
    }

    /**
     * 给hash表中指定字段（Double）增加increment
     */
    public Double setHashIncrement(String key, String field, double increment) {
        return this.redisTemplate.opsForHash().increment(key, field, increment);
    }

    /**
     * 判断hashKey是否存在
     *
     * @param key
     * @param hashKey
     * @return 存在返回true，不存在返回false
     */
    public Boolean exitsHashKey(String key, String hashKey) {
        return this.redisTemplate.opsForHash().hasKey(key, hashKey);
    }

    /**
     * 根据key删除一个或多个字段
     *
     * @param key
     * @param fields
     */
    public void deleteHashByFields(String key, String... fields) {
        this.redisTemplate.opsForHash().delete(key, fields);
    }

    /**
     * 获得缓存的基本对象列表
     *
     * @param pattern 字符串前缀
     * @return 对象列表
     */
    public Collection<String> getKeys(String pattern) {
        return this.redisTemplate.keys(pattern);
    }

    /**
     * 自增
     *
     * @param key
     * @return 自增后的值
     */
    public Long setIncrement(String key) {
        return this.redisTemplate.opsForValue().increment(key);
    }

    /**
     * 自减1
     *
     * @param key
     * @return 自减后的值
     */
    public Long setDecrement(String key) {
        return this.redisTemplate.opsForValue().decrement(key);
    }

    /**
     * 自增 num
     *
     * @param key
     * @return 自增后的值
     */
    public Long setAddNum(String key, long num) {
        return this.redisTemplate.opsForValue().increment(key, num);
    }

    /**
     * 返回RedisTemplate
     *
     * @return RedisTemplate
     */
    public RedisTemplate<String, Object> getRedisTemplate() {
        return this.redisTemplate;
    }

    /**
     * 执行lua脚本，返回执行结果
     *
     * @param redisScript
     * @param key
     * @param value
     * @return
     */
    public Object execute(DefaultRedisScript<Object> redisScript, String key, Object value) {
        return this.redisTemplate.execute(redisScript, Arrays.asList(key), value);
    }

    /**
     * 设置key，如已存在返回false，成功返回true
     *
     * @param key
     * @return boolean
     * @author weirx
     * @date: 2022/4/4
     */
    public boolean setNX(String key) {
        Boolean result = redisTemplate.opsForValue().setIfAbsent(key, 1, Duration.ofSeconds(1800));
        if (result != null) {
            return result;
        }
        return false;
    }

    /**
     * 左侧插入列表
     * @param key
     * @param value
     * @author weirx
     * @return boolean
     * @date: 2022/4/5
     */
    public boolean leftPush(String key, Object value) {
        Long aLong = redisTemplate.opsForList().leftPush(key, value);
        if (aLong == 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 右侧取出列表
     * @param key
     * @author weirx
     * @return java.lang.Object
     * @date: 2022/4/5
     */
    public Object rightPop(String key) {
        return redisTemplate.opsForList().rightPop(key);
    }
}