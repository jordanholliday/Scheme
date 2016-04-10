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

ActiveRecord::Schema.define(version: 20160409232544) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "invites", force: :cascade do |t|
    t.integer  "team_id",                    null: false
    t.string   "email",                      null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.boolean  "replied",    default: false
  end

  add_index "invites", ["email"], name: "index_invites_on_email", unique: true, using: :btree
  add_index "invites", ["team_id"], name: "index_invites_on_team_id", using: :btree

  create_table "memberships", force: :cascade do |t|
    t.integer  "member_id",  null: false
    t.integer  "team_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "memberships", ["member_id", "team_id"], name: "index_memberships_on_member_id_and_team_id", unique: true, using: :btree
  add_index "memberships", ["member_id"], name: "index_memberships_on_member_id", unique: true, using: :btree

  create_table "projects", force: :cascade do |t|
    t.string   "name",                         null: false
    t.string   "description"
    t.integer  "team_id",                      null: false
    t.boolean  "archived",     default: false, null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.integer  "last_task_id"
  end

  add_index "projects", ["team_id"], name: "index_projects_on_team_id", using: :btree

  create_table "task_comments", force: :cascade do |t|
    t.string   "body"
    t.integer  "task_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.string   "name",                             null: false
    t.text     "description"
    t.date     "deadline"
    t.string   "repeats"
    t.boolean  "completed",        default: false
    t.integer  "parent_id"
    t.integer  "assignee_id"
    t.integer  "creator_id",                       null: false
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.integer  "project_id"
    t.integer  "previous_task_id"
    t.integer  "next_task_id"
  end

  add_index "tasks", ["assignee_id"], name: "index_tasks_on_assignee_id", using: :btree
  add_index "tasks", ["creator_id"], name: "index_tasks_on_creator_id", using: :btree
  add_index "tasks", ["parent_id"], name: "index_tasks_on_parent_id", using: :btree
  add_index "tasks", ["project_id"], name: "index_tasks_on_project_id", using: :btree

  create_table "teams", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "creator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "teams", ["creator_id"], name: "index_teams_on_creator_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",               null: false
    t.string   "name",                null: false
    t.string   "password_digest",     null: false
    t.string   "session_token",       null: false
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

end
