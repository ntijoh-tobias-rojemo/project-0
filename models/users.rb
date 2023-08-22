require 'sqlite3'
require 'bcrypt'

class Users

    #Returnerar samtligt inehåll i databasen.
    def self.all
        db.execute('SELECT * FROM users ORDER BY id')
    end

    def self.get(id)
        db.execute('SELECT * FROM users WHERE id = ? LIMIT 1', id)[0]
    end

    def self.login(username, password)
        data = db.execute('SELECT id, password FROM users WHERE username = ?', username)
        return nil if data.empty?
        return data[0]["id"] if BCrypt::Password.new(data[0]['password']) == password
        return nil
    end

    def self.register(username, password)
        digest = BCrypt::Password.create(password)
        db.execute('INSERT INTO users (username, password) VALUES (?,?)', username, digest)
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