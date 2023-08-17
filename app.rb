class App < Sinatra::Base

    get '/' do
        "Använd routerna images & people"
    end

    get '/images' do
        erb :images
    end

    get '/people' do
        erb :people
    end
    
end