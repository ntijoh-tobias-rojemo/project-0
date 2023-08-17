class App < Sinatra::Base

    get '/' do
        "Hello, world!"
    end

    get '/images' do
        erb("images")
    end

    get '/people' do
        erb("people")
    end
    
end