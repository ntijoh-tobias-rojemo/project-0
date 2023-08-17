class App < Sinatra::Base

    get '/' do
        @people = People.all
    end

    get '/images' do
        erb("images")
    end

    get '/people' do
        erb("people")
    end
    
end