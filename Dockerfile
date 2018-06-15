FROM node:9.11.2
WORKDIR /Users/dayanperera/Documents/Udemy/tech-developer-hub
COPY ./ ./
RUN npm install
EXPOSE 8000
CMD ["/bin/bash"]