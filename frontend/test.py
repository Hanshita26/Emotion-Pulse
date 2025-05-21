import tensorflow as tf

# a constant 
hello= tf.constant("hello,world!")

# create a tensorflow session
with tf.compat.v1.session() as sess:
    result=sess.run(hello)
    print(result.decode())


