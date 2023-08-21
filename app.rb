require_relative 'models/people.rb'

class App < Sinatra::Base

    get '/' do
        @datastring = People.all_as_string
        erb :main
    end

    get '/images' do
        @people = People.all
        erb :images
    end

    get '/people' do
        @people = People.all
        erb :people
    end

    get '/results/:answers' do |answers|
        @people = People.all
        @answers = answers.to_i
        erb :results
    end  
end