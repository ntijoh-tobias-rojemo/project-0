require 'sinatra'
require 'erb'
require_relative 'models/people.rb'
require_relative 'models/users.rb'

class App < Sinatra::Base
    #enable :sessions
    use Rack::Session::Cookie,  :key => 'rack.session',
                                :path => '/',
                                :secret => 'your_secret'

    get '/' do
        redirect :"/0"
    end

    get '/login' do
        @title = "Login"
        erb :login
    end

    get '/admin' do
        @title = "Dashboard"
        erb :admin
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

    post '/login' do
        id = Users.login(params[:username], params[:password])
        session[:id] = id
        redirect :"/admin" if id
        redirect :"/login"
    end

    post '/register' do
        Users.register(params[:username], params[:password])
        redirect :"/login"
    end

    post '/create_student' do
        p session
        return 403 unless session[:id]
        return 403 unless (Users.get(session[:id])["admin"] == 1)
        People.create(params[:name], params[:nickname], params[:classid], "/img/#{params[:name]}.jpeg")
        File.open("public/img/#{params[:name]}.jpeg", "wb") {|file| file.write(params[:image][:tempfile].read)} # Stort F File är en klass som defineras inom ruby som används för att interagera med filsustemet, lilla f variabel som definerad i programmet
        redirect :"/admin"
    end

    error 403 do
        "Access denied"
    end
end