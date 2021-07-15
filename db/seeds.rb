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

demo_user = User.create(email: 'demodog@dogs.com', password: 'password', first_name: 'Demo', last_name: 'Dog', breed: "Man's best friend", country: 'Turkey', region: 'Istanbul', about_me: "A super friendly street dog from Turkey. I love following tourists on my favorite hikes and playing with the other doggos in my village. Feel free to connect if you're in the area and up for a play date with an excellent view of the Bosphorus!")
demo_user.profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/demo_dog_prof.jpg'), filename: 'demo_dog_prof.jpg')

goose = User.create(email: 'goose@dogs.com', password: 'password', first_name: 'Goose', last_name: 'Flynn', breed: 'Coonhound Mix', country: 'United States', region: 'San Francisco, California', about_me: "I'm a rescue dog living in San Francisco! My mom saved me from the pound and I have the best life now. I love adventures hiking and camping or hanging out at the crag while mom and dad climb. I know way too many tricks because I absolutely live for treats. Feel free to throw some treats my way, I'll be your best friend!")
goose.profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/Goose_prof.jpg'), filename: 'Goose_prof.jpg')
    
duke = User.create(email: 'duke@dogs.com', password: 'password', first_name: 'Duke', last_name: 'Flynn', breed: 'Labrador Retriever', country: 'United States', region: 'Charleston, South Carolina', about_me: "I'm one of the oldest dogs you might ever meet. But that also means I'm one of the goodest. My favorite activities these days include meal times and hanging out with my family. I have a really cool trick where I carry my bowl around to show my people how hungry I am. Usually they still only feed me at breakfast and dinner time, but after nearly 16 years I'm still hopeful one day I'll get an extra bowlful!")
duke.profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/Duke_prof.jpg'), filename: 'Duke_prof.jpg')

koby = User.create(email: 'koby@dogs.com', password: 'password', first_name: 'Koby', last_name: 'Albert', breed: 'Australian Shepherd', country: 'United States', region: 'San Diego, California', about_me: "I'm a super cool SoCal pup! I loooove frisbees, the park, and barking at friends that walk by my backyard. I just get a little excited ok?? I mean, how am I supposed to make friends from behind a fence?")
koby.profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/Koby_prof.jpeg'), filename: 'Koby_prof.jpeg')

athena = User.create(email: 'athena@dogs.com', password: 'password', first_name: 'Athena', last_name: 'Zenker', breed: 'Alaskan Malamute', country: 'United States', region: 'San Francisco, California', about_me: "I may be a big dog, but I've got an even bigger heart! Magestic and strong, I love taking my dad for walks and eating aaalll the snacks (even though sometimes my dad says the things I eat aren't meant to be snacks, but I think he's just crazy)")
athena.profile_photo.attach(io: URI.open('https://barked-in-seeds.s3.us-west-1.amazonaws.com/Athena_prof.jpg'), filename: 'Athena_prof.jpg')
    
teak = User.create(email: 'teak@dogs.com', password: 'password', first_name: 'Teak', last_name: 'Roman', breed: 'Australian Shepherd', country: 'United States', region: 'Los Angeles, California', about_me: "I'm a very pretty girl who loves to give kisses. The more the better! I'm a professional player and beach goer and love traveling with my mama. She takes me on lots of fun trips where I get to play with my other doggy friends, or find big sticks. Feel free to connect if you'd like to go stick hunting at the beach with me!")
teak.profile_photo.attach(io: URI.open('https://barked-in-seeds.s3.us-west-1.amazonaws.com/Teak_prof.jpg'), filename: 'Teak_prof.jpg')

soba = User.create(email: 'soba@dogs.com', password: 'password', first_name: 'Soba', last_name: 'Poblete', breed: 'Shetland Sheepdog', country: 'United States', region: 'San Francisco, California', about_me: "What's up! I'm Soba. I'm basically a professional model (and taco thief). My instagram probably has more followers than yours, but it's ok I'll still play with you. I like playing with everyone! Even if my sister gets a little jealous sometimes of all the attention I get...you can't blame her though, have you seen me?? Go ahead and add yourself to my list of friends. I can never have enough!")
soba.profile_photo.attach(io: URI.open('https://barked-in-seeds.s3.us-west-1.amazonaws.com/Soba_prof.jpg'), filename: 'Soba_prof.jpg')
    
lily = User.create(email: 'lily@dogs.com', password: 'password', first_name: 'Lily', last_name: 'Tsui', breed: 'Golden Retriever', country: 'United States', region: 'San Francisco, California', about_me: "Hey there! I'm Lily. Some call me the referee because my favorite activity is barking at dogs while they play. I just want to make sure everyone is being safe ok! If I don't do it, nobody will...and we definitely don't want that!")
lily.profile_photo.attach(io: URI.open('https://barked-in-seeds.s3.us-west-1.amazonaws.com/Lily_prof.JPG'), filename: 'Lily_prof.jpg')
    
lyla = User.create(email: 'lyla@dogs.com', password: 'password', first_name: 'Lyla', last_name: 'Roubitchek', breed: 'Goldendoodle', country: 'United States', region: 'San Diego, California', about_me: "I am the spunkiest little girl you'll ever meet. I love making friends with people and dogs alike, although sometimes I feel bad that they can't keep up with me. My dad has a really cool shoe company so I'm passionate about the cause of reminding doggos that shoes are not snacks! And if you don't eat the shoes, your people might give you better snacks, what a treat! Speaking of, feel free to throw me some treats below :)")  
lyla.profile_photo.attach(io: URI.open('https://barked-in-seeds.s3.us-west-1.amazonaws.com/Lyla_prof.JPG'), filename: 'Lyla_prof.jpg')


connections = Connection.create([
  {user_id1: demo_user.id, user_id2: goose.id, status: 'connected'},
  {user_id1: demo_user.id, user_id2: duke.id, status: 'connected'},
  {user_id1: demo_user.id, user_id2: athena.id, status: 'connected'},
  {user_id1: demo_user.id, user_id2: teak.id, status: 'pending_user2'},
  {user_id1: demo_user.id, user_id2: soba.id, status: 'pending_user2'},
  {user_id1: demo_user.id, user_id2: lyla.id, status: 'pending_user1'},
  {user_id1: goose.id, user_id2: koby.id, status: 'connected'},
  {user_id1: goose.id, user_id2: athena.id, status: 'connected'},
  {user_id1: goose.id, user_id2: teak.id, status: 'connected'},
  {user_id1: goose.id, user_id2: soba.id, status: 'connected'},
  {user_id1: goose.id, user_id2: lily.id, status: 'connected'},
  {user_id1: goose.id, user_id2: duke.id, status: 'pending_user1'},
  {user_id1: duke.id, user_id2: koby.id, status: 'pending_user2'},
  {user_id1: koby.id, user_id2: teak.id, status: 'pending_user2'},
  {user_id1: athena.id, user_id2: soba.id, status: 'pending_user1'},
  {user_id1: athena.id, user_id2: lily.id, status: 'pending_user1'},
  {user_id1: teak.id, user_id2: soba.id, status: 'connected'},
  {user_id1: teak.id, user_id2: lily.id, status: 'connected'},
  {user_id1: soba.id, user_id2: lily.id, status: 'connected'},
  {user_id1: goose.id, user_id2: lyla.id, status: 'connected'},
  {user_id1: koby.id, user_id2: lyla.id, status: 'connected'},
  {user_id1: teak.id, user_id2: lyla.id, status: 'pending_user2'}
])

posts = Post.create([
  {author_id: demo_user.id, body: "Hi there! Demo dog here! I hope you're enjoying BarkedIn as much as I am. Stay a while and wag a bit :)"},
  {author_id: demo_user.id, body: "Wow just had the best time romping around in the grass with my doggy friends. Woof woof! What a life!"},
  {author_id: demo_user.id, body: "The hikers in my village are starting to come back. Can't wait for all the company!"},
  {author_id: demo_user.id, body: "Found a really sweet nap spot in the shade this morning. Bark bark ruff ruff"},
  {author_id: goose.id, body: "Tried unsuccessfully to steal bread off the sidewalk today. Each failed attempt at a snack is a lesson learned to be quicker next time."},
  {author_id: goose.id, body: "Omg you guys I had kibble again for dinner and it was STILL AMAZING"},
  {author_id: goose.id, body: "Got to bark at some dogs at the dog park today. Had a blast. Anybody want to join next time?"},
  {author_id: goose.id, body: "Learned a new trick today! Who knew that rolling over would make mom give me treats??"},
  {author_id: koby.id, body: "My frisbee is SO FAST"},
  {author_id: koby.id, body: "Made some friends from behind the fence today! Or tried to anyway. The fence is an impressive barrier"},
  {author_id: athena.id, body: ":) :D :) :D"},
  {author_id: athena.id, body: "Yay! Another run with dad today!"},
  {author_id: teak.id, body: "Anybody wanna come to the beach with me and mom? Woof woof"},
  {author_id: teak.id, body: "Teak here! Mom says I'm a gooooood girl!"},
  {author_id: soba.id, body: "Stole another taco today :) Man I am FAST"},
  {author_id: soba.id, body: "Gonna be at the beach tomorrow if anybody wants to play!"},
  {author_id: soba.id, body: "Have you all seen my latest instagram post? I am FIERCE"},
  {author_id: lily.id, body: "Really tired from all the refereeing. Can you pups regulate yourselves some of the time?? A girl can't catch a break!"},
  {author_id: lyla.id, body: "arf arf arf anybody up for a playdate? barks and wags <3"}
])

reactions = Reaction.create([
  {post_id: posts[0].id, liker_id: goose.id, reaction_type: 'wag'},
  {post_id: posts[0].id, liker_id: duke.id, reaction_type: 'wag'},
  {post_id: posts[0].id, liker_id: athena.id, reaction_type: 'throw a bone'},
  {post_id: posts[1].id, liker_id: athena.id, reaction_type: 'high five'},
  {post_id: posts[2].id, liker_id: goose.id, reaction_type: 'high five'},
  {post_id: posts[2].id, liker_id: duke.id, reaction_type: 'wag'},
  {post_id: posts[4].id, liker_id: soba.id, reaction_type: 'throw a bone'},
  {post_id: posts[4].id, liker_id: athena.id, reaction_type: 'throw a bone'},
  {post_id: posts[5].id, liker_id: athena.id, reaction_type: 'high five'},
  {post_id: posts[7].id, liker_id: teak.id, reaction_type: 'high five'},
  {post_id: posts[7].id, liker_id: koby.id, reaction_type: 'high five'},
  {post_id: posts[8].id, liker_id: lyla.id, reaction_type: 'high five'},
  {post_id: posts[9].id, liker_id: goose.id, reaction_type: 'high five'},
  {post_id: posts[10].id, liker_id: goose.id, reaction_type: 'wag'},
  {post_id: posts[11].id, liker_id: goose.id, reaction_type: 'wag'},
  {post_id: posts[12].id, liker_id: soba.id, reaction_type: 'wag'},
  {post_id: posts[12].id, liker_id: lily.id, reaction_type: 'wag'},
  {post_id: posts[13].id, liker_id: goose.id, reaction_type: 'wag'},
  {post_id: posts[14].id, liker_id: goose.id, reaction_type: 'high five'},
  {post_id: posts[14].id, liker_id: lily.id, reaction_type: 'high five'},
  {post_id: posts[15].id, liker_id: lily.id, reaction_type: 'wag'},
  {post_id: posts[16].id, liker_id: teak.id, reaction_type: 'wag'},
  {post_id: posts[17].id, liker_id: goose.id, reaction_type: 'throw a bone'}
])


