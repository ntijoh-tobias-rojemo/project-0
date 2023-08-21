require_relative 'models/people.rb'

class App < Sinatra::Base

    get '/' do
        redirect :"/0"
    end

    get '/:classid' do |classid|
        @datastring = People.class_as_string(classid)
        erb :main
    end

    get '/:classid/images' do |classid|
        @people = People.class(classid)
        erb :images
    end

    get '/:classid/people' do |classid|
        @people = People.class(classid)
        erb :people
    end

    get '/:classid/results/:answers' do |classid, answers|
        @people = People.class(classid)
        @answers = answers.to_i
        erb :results
    end  
end