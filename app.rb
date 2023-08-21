require_relative 'models/people.rb'
require_relative 'models/users.rb'
enable :sessions

class App < Sinatra::Base

    get '/' do
        redirect :"/0"
    end

    get '/login' do
        erb :login
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

    get '/:classid/defence' do |classid|
        @datastring = People.class_as_string(classid)
        erb :defence
    end  

    get '/admin' do
        erb :admin
    end

    post '/login' do
        id = Users.login(params[:username], params[:password])
        session[:id] = id
        if id do redirect :"/admin"
        redirect :"/login"
    end

    post '/register' do
        Users.register(params[:username], params[:password])
        redirect :"/login"
    end
end