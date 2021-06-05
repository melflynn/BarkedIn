# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all

require 'open-uri'

demo_user = User.create(email: 'demodog@dogs.com', password: 'password', first_name: 'Demo', last_name: 'Dog', breed: "Man's best friend", country: 'Turkey', region: 'Istanbul', about_me: "A super friendly street dog from Turkey. I love following tourists on my favorite hikes and playing with the other doggos in my village. Feel free to connect if you're in the area and up for a play date with an excellent view of the Bosphorus!");

demo_user.profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/demo_dog_prof.jpg'), filename: 'demo_dog_prof.jpg')

users = User.create([
  {email: 'goose@dogs.com', password: 'password', first_name: 'Goose', last_name: 'Flynn', breed: 'Coonhound Mix', country: 'United States', region: 'San Francisco, California', about_me: "I'm a rescue dog living in San Francisco! My mom saved me from the pound and I have the best life now. I love adventures hiking and camping or hanging out at the crag while mom and dad climb. I know way too many tricks because I absolutely live for treats. Feel free to throw some treats my way, I'll be your best friend!"}, 
  {email: 'duke@dogs.com', password: 'password', first_name: 'Duke', last_name: 'Flynn', breed: 'Labrador Retriever', country: 'United States', region: 'Charleston, South Carolina', about_me: "I'm one of the oldest dogs you might ever meet. But that also means I'm one of the goodest. My favorite activities these days include meal times and hanging out with my family. I'm always really proud when I walk up the stairs by myself to watch TV with dad!"}, 
  {email: 'koby@dogs.com', password: 'password', first_name: 'Koby', last_name: 'Albert', breed: 'Australian Shepherd', country: 'United States', region: 'San Diego, California', about_me: "I'm a super cool SoCal pup! I loooove frisbees, the park, and barking at friends that walk by my backyard. I just get a little excited ok?? I mean, how am I supposed to make friends from behind a fence?"}
])

users[0].profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/Goose_prof.jpg'), filename: 'Goose_prof.jpg')
users[1].profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/Duke_prof.jpg'), filename: 'Duke_prof.jpg')
users[2].profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/Koby_prof.jpeg'), filename: 'Koby_prof.jpeg')