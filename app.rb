require 'sinatra'
require 'erb'
require_relative 'models/people.rb'
require_relative 'models/users.rb'

class App < Sinatra::Base
    #enable :sessions
    use Rack::Session::Cookie,  :key => 'rack.session',
                                :path => '/',
                                :secret => 'Grillkorv!'

    #Roten leder till klass 0 om man inte valt någon
    get '/' do
        redirect :"/0"
    end

    get '/login' do
        @title = "Login"
        erb :login
    end
    
    get '/register' do
        erb :register
    end


    get '/admin' do
        @title = "Dashboard"
        erb :admin
    end

    #@datastring kommer packas upp och användas i main.js
    get '/:classid' do |classid|
        @title = "Practise"
        @datastring = People.class_as_string(classid)
        erb :main
    end

    get '/:classid/images' do |classid|
        @title = "Test yourself"
        @people = People.class(classid)
        erb :images
    end

    get '/:classid/people' do |classid|
        @title = "Study"
        @people = People.class(classid)
        erb :people
    end

    get '/:classid/results/:answers' do |classid, answers|
        @title = "Results"
        @people = People.class(classid)
        @answers = answers.to_i
        erb :results
    end

    get '/:classid/defence' do |classid|
        @title = "Game"
        @datastring = People.class_as_string(classid)
        erb :defence
    end  

    #:admin_status blir 1 om användaren är admin, 0 om den ej är det och nil om användaren inte hittas.
    post '/login' do
        session[:admin_status] = Users.login(params[:username], params[:password])
        redirect :"/admin" if session[:admin_status] == 1
        redirect :"/login"
    end

    #användaren läggs till i databsen, ska den göras ill admin måste det göras manuellt.
    post '/register' do
        Users.register(params[:username], params[:password])
        redirect :"/login"
    end

    #Lägger in en ny elev i databsen om användaren har admin status
    post '/create_student' do
        return 403 unless session[:admin_status] ==1
        People.create(params[:name], params[:nickname], params[:classid], "/img/#{params[:name]}.jpeg")
        File.open("public/img/#{params[:name]}.jpeg", "wb") {|file| file.write(params[:image][:tempfile].read)} # Stort F File är en klass som defineras inom ruby som används för att interagera med filsustemet, lilla f variabel som definerad i programmet
        redirect :"/admin"
    end

    #Om man inte är satt som admin i databasen (måste nuvarande göras manuellt).
    error 403 do
        @title = "Error 403"
        "Access denied"
    end
end