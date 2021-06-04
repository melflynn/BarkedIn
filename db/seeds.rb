# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all

require 'open-uri'

demo_user = User.create(email: 'demodog@dogs.com', password: 'password', first_name: 'Demo', last_name: 'Dog', breed: "Man's best friend", country: 'Turkey', region: 'Istanbul');

demo_user.profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/demo_dog_prof.jpg'), filename: 'demo_dog_prof.jpg')

users = User.create([{email: 'goose@dogs.com', password: 'password', first_name: 'Goose', last_name: 'Flynn', breed: 'Coonhound Mix', country: 'United States', region: 'San Francisco, California'}, {email: 'duke@dogs.com', password: 'password', first_name: 'Duke', last_name: 'Flynn', breed: 'Labrador Retriever', country: 'United States', region: 'Charleston, South Carolina'}, {email: 'koby@dogs.com', password: 'password', first_name: 'Koby', last_name: 'Albert', breed: 'Australian Shepherd', country: 'United States', region: 'San Diego, California'}])

users[0].profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/Goose_prof.jpg'), filename: 'Goose_prof.jpg')
users[1].profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/Duke_prof.jpg'), filename: 'Duke_prof.jpg')
users[2].profile_photo.attach(io: URI.open('https://barked-in-seeds.s3-us-west-1.amazonaws.com/Koby_prof.jpeg'), filename: 'Koby_prof.jpeg')