# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150205073520) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "board_memberships", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "board_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "boards", force: :cascade do |t|
    t.string   "title",          null: false
    t.integer  "user_id",        null: false
    t.string   "repository_url", null: false
    t.integer  "repository_id",  null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "card_assignments", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "card_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cards", force: :cascade do |t|
    t.string   "title",                     null: false
    t.integer  "list_id",                   null: false
    t.text     "description"
    t.float    "ord",         default: 0.0, null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "lists", force: :cascade do |t|
    t.string   "title",                    null: false
    t.float    "ord",        default: 0.0
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "board_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "session_token",                    null: false
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.string   "provider",      default: "github"
    t.string   "uid",                              null: false
    t.string   "name"
    t.string   "email",                            null: false
    t.string   "username",                         null: false
    t.string   "token",                            null: false
  end

end
