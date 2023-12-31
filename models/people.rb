require 'sqlite3'

class People

    #Returnerar samtligt inehåll i databasen.
    def self.all
        db.execute('SELECT * FROM people ORDER BY id')
    end

    #Returnerar samtligt inehåll i databsen som en sträng.
    def self.all_as_string
        data = db.execute('SELECT * FROM people ORDER BY id')
        return data.map { |person| "#{person["id"]}§#{person["image"]}§#{person["name"]}§#{person["nickname"] || "NO_NICK"}" }.join("§§")
    end

    #Returnerar en klass ur databasen
    def self.class(class_id)
        db.execute('SELECT * FROM people WHERE classid = ? ORDER BY id', class_id)
    end

    #Returnerar en klass ur darabasen som en sträng
    def self.class_as_string(class_id)
        data = db.execute('SELECT * FROM people WHERE classid = ? ORDER BY id', class_id)
        return data.map { |person| "#{person["id"]}§#{person["image"]}§#{person["name"]}§#{person["nickname"] || "NO_NICK"}" }.join("§§")
    end

    #Lägger till en elev i databasen
    def self.create(name, nickname, classid, image)
        if nickname == ""
            db.execute('INSERT INTO people (name, classid, image) VALUES (?,?,?)', name, classid, image)
        else
            db.execute('INSERT INTO people (name, nickname, classid, image) VALUES (?,?,?,?)', name, nickname, classid, image)
        end
    end

    private
    #Returnerar en databas om den finns, annars skapas en.
    def self.db
        return @db if @db
        @db = SQLite3::Database.new('db/db.sqlite')
        @db.results_as_hash = true
        @db
    end
end