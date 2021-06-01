# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all

demo_user = User.create(email: 'demodog@dogs.com', password: 'password', first_name: 'Demo', last_name: 'Dog', breed: "Man's best friend");
users = User.create([{email: 'goose@dogs.com', password: 'password', first_name: 'Goose', last_name: 'Flynn', breed: 'Coonhound Mix'}, {email: 'duke@dogs.com', password: 'password', first_name: 'Duke', last_name: 'Flynn', breed: 'Labrador Retriever'}, {email: 'koby@dogs.com', password: 'password', first_name: 'Koby', last_name: 'Albert', breed: 'Australian Shepherd'}])