1. What is the purpose of using _sessions_?
    Sessions provide us with a way to have state on a server. They allow us to store data for individual users with unique session IDs, which means we can persist page information across requests. 
    
1. What does bcrypt do to help us store passwords in a secure manner?
    Bcrypt generates random bytes, called salts, and combines the salts with the password before hashing to create unique hashes for each password. It also uses hashing algorithms that are one-way functions, which increases security.  These one-way functions were also designed to be slow. This slowness means that it is far more difficult to compare a bcrypt-password against a list of likely passwords.

1. What does bcrypt do to slow down attackers?
    It uses a key factor to slow down hashing speed significantly, which increases its resistance to hacking.
    
1. What are the three parts of the JSON Web Token?
    A JSON Web Token is made up of the header (the token type), the payload or data, and the signature, which verifies the data.