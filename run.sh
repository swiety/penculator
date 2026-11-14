#!/bin/sh
set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$project_dir"

if ! bundle check > /dev/null; then
  printf '%s\n' 'Install the Ruby dependencies first: bundle install' >&2
  exit 1
fi

exec bundle exec ruby -r "$project_dir/scripts/ruby4-compat.rb" -S jekyll serve "$@"
