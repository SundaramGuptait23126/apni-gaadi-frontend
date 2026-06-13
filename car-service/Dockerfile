# Dockerfile ke andar hum likhte hain ki Container kaise banega

# 1. Base Image (Konsa OS aur konsa software chahiye?)
# Humne Node.js version 20 ka lightweight version (alpine) chuna hai.
FROM node:20-alpine

# 2. Working Directory
# Container ke andar ek folder banayenge jahan humara saara code rahega.
WORKDIR /usr/src/app

# 3. Dependencies Copy Karna
# Sabse pehle sirf package.json copy karo (taaki agar code change ho par dependencies same rahein, toh docker cache use karega).
COPY package*.json ./

# 4. Install Dependencies
RUN npm install

# 5. Saara Code Copy Karna
# Ab baaki bacha hua poora code container mein copy karo.
COPY . .

# 6. Port Expose Karna
# Container ke bahar duniya ko batao ki yeh app port 5002 par chalti hai.
EXPOSE 5002

# 7. Start Command
# Container start hote hi konsi command chalani hai?
CMD ["npm", "start"]
