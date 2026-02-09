#!/usr/bin/env bash

mkdir -p PDFs Images Text

for file in *; do
  # skip directories
  [ -f "$file" ] || continue

  case "$file" in
    *.pdf)
      mv -- "$file" PDFs/
      ;;
    *.jpg|*.png)
      mv -- "$file" Images/
      ;;
    *.txt)
      mv -- "$file" Text/
      ;;
  esac
done
