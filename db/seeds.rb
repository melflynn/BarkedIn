# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Connection.destroy_all
User.destroy_all

require 'open-uri'

demo_user = User.create(email: 'demodog@dogs.com', password: 'password', first_name: 'Demo', last_name: 'Dog', breed: "Man's best friend", country: 'Turkey', region: 'Istanbul', about_me: "A super friendly street dog from Turkey. I love following tourists on my favorite hikes and playing with the other doggos in my village. Feel free to connect if you're in the area and up for a play date with an excellent view of the Bosphorus!");

demo_user.profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/demo_dog_prof.jpg'), filename: 'demo_dog_prof.jpg')

users = User.create([
  {email: 'goose@dogs.com', password: 'password', first_name: 'Goose', last_name: 'Flynn', breed: 'Coonhound Mix', country: 'United States', region: 'San Francisco, California', about_me: "I'm a rescue dog living in San Francisco! My mom saved me from the pound and I have the best life now. I love adventures hiking and camping or hanging out at the crag while mom and dad climb. I know way too many tricks because I absolutely live for treats. Feel free to throw some treats my way, I'll be your best friend!"}, 
  {email: 'duke@dogs.com', password: 'password', first_name: 'Duke', last_name: 'Flynn', breed: 'Labrador Retriever', country: 'United States', region: 'Charleston, South Carolina', about_me: "I'm one of the oldest dogs you might ever meet. But that also means I'm one of the goodest. My favorite activities these days include meal times and hanging out with my family. I have a really cool trick where I carry my bowl around to show my people how hungry I am. Usually they still only feed me at breakfast and dinner time, but after nearly 16 years I'm still hopeful one day I'll get an extra bowlful!"}, 
  {email: 'koby@dogs.com', password: 'password', first_name: 'Koby', last_name: 'Albert', breed: 'Australian Shepherd', country: 'United States', region: 'San Diego, California', about_me: "I'm a super cool SoCal pup! I loooove frisbees, the park, and barking at friends that walk by my backyard. I just get a little excited ok?? I mean, how am I supposed to make friends from behind a fence?"},
  {email: 'athena@dogs.com', password: 'password', first_name: 'Athena', last_name: 'Zenker', breed: 'Alaskan Malamute', country: 'United States', region: 'San Francisco, California', about_me: "I may be a big dog, but I've got an even bigger heart! Magestic and strong, I love taking my dad for walks and eating aaalll the snacks (even though sometimes my dad says the things I eat aren't meant to be snacks, but I think he's just crazy)"},
  {email: 'teak@dogs.com', password: 'password', first_name: 'Teak', last_name: 'Roman', breed: 'Australian Shepherd', country: 'United States', region: 'Los Angeles, California', about_me: "I'm a very pretty girl who loves to give kisses. The more the better! I'm a professional player and beach goer and love traveling with my mama. She takes me on lots of fun trips where I get to play with my other doggy friends, or find big sticks. Feel free to connect if you'd like to go stick hunting at the beach with me!"},
  {email: 'soba@dogs.com', password: 'password', first_name: 'Soba', last_name: 'Poblete', breed: 'Shetland Sheepdog', country: 'United States', region: 'San Francisco, California', about_me: "What's up! I'm Soba. I'm basically a professional model (and taco thief). My instagram probably has more followers than yours, but it's ok I'll still play with you. I like playing with everyone! Even if my sister gets a little jealous sometimes of all the attention I get...you can't blame her though, have you seen me?? Go ahead and add yourself to my list of friends. I can never have enough!"},
  {email: 'lily@dogs.com', password: 'password', first_name: 'Lily', last_name: 'Tsui', breed: 'Golden Retriever', country: 'United States', region: 'San Francisco, California', about_me: "Hey there! I'm Lily. Some call me the referee because my favorite activity is barking at dogs while they play. I just want to make sure everyone is being safe ok! If I don't do it, nobody will...and we definitely don't want that!"},
  {email: 'lyla@dogs.com', password: 'password', first_name: 'Lyla', last_name: 'Roubitchek', breed: 'Goldendoodle', country: 'United States', region: 'San Diego, California', about_me: "I am the spunkiest little girl you'll ever meet. I love making friends with people and dogs alike, although sometimes I feel bad that they can't keep up with me. My dad has a really cool shoe company so I'm passionate about the cause of reminding doggos that shoes are not snacks! And if you don't eat the shoes, your people might give you better snacks, what a treat! Speaking of, feel free to throw me some treats below :)"}  
])

users[0].profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/Goose_prof.jpg'), filename: 'Goose_prof.jpg')
users[1].profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/Duke_prof.jpg'), filename: 'Duke_prof.jpg')
users[2].profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/Koby_prof.jpeg'), filename: 'Koby_prof.jpeg')
users[3].profile_photo.attach(io: URI.open('https://barked-in-seeds.s3.us-west-1.amazonaws.com/Athena_prof.jpg'), filename: 'Athena_prof.jpg')
users[4].profile_photo.attach(io: URI.open('https://barked-in-seeds.s3.us-west-1.amazonaws.com/Teak_prof.jpg'), filename: 'Teak_prof.jpg')
users[5].profile_photo.attach(io: URI.open('https://barked-in-seeds.s3.us-west-1.amazonaws.com/Soba_prof.jpg'), filename: 'Soba_prof.jpg')
users[6].profile_photo.attach(io: URI.open('https://barked-in-seeds.s3.us-west-1.amazonaws.com/Lily_prof.JPG'), filename: 'Lily_prof.jpg')
users[7].profile_photo.attach(io: URI.open('https://barked-in-seeds.s3.us-west-1.amazonaws.com/Lyla_prof.JPG'), filename: 'Lyla_prof.jpg')

connections = Connection.create([
  {user_id1: demo_user.id, user_id2: users[0].id, status: 'connected'},
  {user_id1: demo_user.id, user_id2: users[1].id, status: 'connected'},
  {user_id1: demo_user.id, user_id2: users[3].id, status: 'connected'},
  {user_id1: demo_user.id, user_id2: users[4].id, status: 'pending_user2'},
  {user_id1: demo_user.id, user_id2: users[5].id, status: 'pending_user2'},
  {user_id1: demo_user.id, user_id2: users[7].id, status: 'pending_user1'},
  {user_id1: users[0].id, user_id2: users[2].id, status: 'connected'},
  {user_id1: users[0].id, user_id2: users[3].id, status: 'connected'},
  {user_id1: users[0].id, user_id2: users[4].id, status: 'connected'},
  {user_id1: users[0].id, user_id2: users[5].id, status: 'connected'},
  {user_id1: users[0].id, user_id2: users[6].id, status: 'connected'},
  {user_id1: users[0].id, user_id2: users[1].id, status: 'pending_user1'},
  {user_id1: users[1].id, user_id2: users[2].id, status: 'pending_user2'},
  {user_id1: users[2].id, user_id2: users[4].id, status: 'pending_user2'},
  {user_id1: users[3].id, user_id2: users[5].id, status: 'pending_user1'},
  {user_id1: users[3].id, user_id2: users[6].id, status: 'pending_user1'},
  {user_id1: users[4].id, user_id2: users[5].id, status: 'connected'},
  {user_id1: users[4].id, user_id2: users[6].id, status: 'connected'},
  {user_id1: users[5].id, user_id2: users[6].id, status: 'connected'},
  {user_id1: users[0].id, user_id2: users[7].id, status: 'connected'},
  {user_id1: users[2].id, user_id2: users[7].id, status: 'connected'},
  {user_id1: users[4].id, user_id2: users[7].id, status: 'pending_user2'},

])