 
# Slot-Tok Backend

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# run migration script
$ npm run migration

# run seeder script
$ npm run seeder

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Implemented
 - Guest Mode Authentication
    - Users can play the game without requiring an account.
    - Each user session is identified using a unique MD5 hash key, which is stored in the database.
    - This ensures a lightweight and quick onboarding experience while still tracking user interactions.

 - Bet Result Generation
    - The backend determines the outcome of each spin using the Math.random() function.
    - The random number is used to calculate whether the player wins or loses, based on predefined payout probabilities.
    - The system ensures fairness while maintaining house edge balance.
 - Dynamic Video Selection During Spins
    - While the reels are spinning, a randomly selected video is played for the user.
    - The video links are stored in the database and retrieved dynamically using Math.random().
    - This feature enhances user engagement and adds an immersive storytelling aspect to the game.
- Video Engagement Features
    - Users can like or favorite videos, creating a more interactive experience.
    - These interactions are stored in the database, allowing personalization based on user preferences.
    - This engagement feature enhances retention and encourages users to explore more content.

## To Enrich
- Authentication System
    - Guest mode removal: Players must register to access the game.
    - Login & Registration: Secure user authentication with credential-based sign-in.
    - Token-based authentication: JWT or similar token generation for session management.

- Fair Benefit for Users and the Platform
  
    - Verified Random Number Generation: Replace or supplement crypto.getRandomValues with a provably fair algorithm for bet calculations.
    - Customizable algorithms: Develop an in-house algorithm for better fairness control.
    - Daily Free Spins: Introduce a reward system where users get one free spin per day.
    - User Levels & Perks: Higher levels unlock additional bonuses (e.g., extra spins, multipliers).
- Video System Enhancements
    - Use a verified random number generator for video selection.
    - Rank videos based on likes, favorites, and watch count.
    - If all available videos are played, restart from scratch.