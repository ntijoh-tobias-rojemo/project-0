class App < Sinatra::Base

    get '/' do
        @datastring = People.all_as_string
        "Använd routerna images & people"
    end

    get '/images' do
        @people = People.all
        erb :images
    end

    get '/people' do
        @people = People.all
        erb :people
    end
    
end