import { Template } from "../../types.js";

export const rustPatternsTemplate: Template = {
  id: "rust-patterns",
  name: "Rust Development Patterns",
  description: "Idiomatic Rust with ownership patterns, error handling, and best practices",
  category: "language",
  tags: ["rust", "systems", "ownership", "safety"],
  author: "awesome-cursorrules community",
  sourceUrl: "https://github.com/PatrickJS/awesome-cursorrules",
  content: {
    mainRules: `# Rust Development Patterns

## Code Philosophy
- Ownership and borrowing
- Zero-cost abstractions
- Memory safety without GC
- Fearless concurrency

## Standards
- Rust 2021 edition
- clippy for linting
- rustfmt for formatting
- cargo for build
`,
    codeStyleRules: `# Rust Code Style

## Ownership Patterns
\`\`\`rust
// Take ownership
fn process_string(s: String) -> String {
    s.to_uppercase()
}

// Borrow immutably
fn read_string(s: &str) -> usize {
    s.len()
}

// Borrow mutably
fn modify_string(s: &mut String) {
    s.push_str(" modified");
}
\`\`\`

## Error Handling
\`\`\`rust
use std::fs::File;
use std::io::{self, Read};

fn read_file(path: &str) -> Result<String, io::Error> {
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

// Using the result
match read_file("config.txt") {
    Ok(contents) => println!("{}", contents),
    Err(e) => eprintln!("Error: {}", e),
}
\`\`\`

## Struct Patterns
\`\`\`rust
#[derive(Debug, Clone)]
pub struct User {
    pub id: u64,
    pub name: String,
    pub email: String,
}

impl User {
    pub fn new(id: u64, name: String, email: String) -> Self {
        Self { id, name, email }
    }
    
    pub fn display_name(&self) -> String {
        format!("{} ({})", self.name, self.email)
    }
}
\`\`\`

## Trait Implementation
\`\`\`rust
trait Validate {
    fn validate(&self) -> Result<(), String>;
}

impl Validate for User {
    fn validate(&self) -> Result<(), String> {
        if self.email.contains('@') {
            Ok(())
        } else {
            Err("Invalid email".to_string())
        }
    }
}
\`\`\`
`,
  },
};

export default rustPatternsTemplate;

