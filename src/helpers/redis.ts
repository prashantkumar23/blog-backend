import redis from 'redis';

const client = redis.createClient({
    port: parseInt(process.env.redis_port as string),
    host: process.env.redis_host,
    password: process.env.redis_password,

})

client.on('connect', () => {
    console.log('Client connected to redis...')
})

client.on('ready', () => {
    console.log('Client connected to redis and ready to use...')
})

client.on('error', (err) => {
    console.log(err.message)
})

client.on('end', () => {
    console.log('Client disconnected from redis')
})

process.on('SIGINT', () => {
    client.quit()
})

export default client