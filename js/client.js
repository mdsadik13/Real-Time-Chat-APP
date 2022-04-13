
const socket = io('http://localhost:5500');

const form =document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');

const append=(message, position)=>{
      const messaElement = document.createElement('div');
      messaElement.innerText = message;
      messaElement.classList.add('message');
      messaElement.classList.add(position);
      messageContainer.append(messaElement);
      if(position=='left'){
      audio.play();
      }
}

form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const message = messageInput.value;
      append(`You: ${message}`,'right');
      socket.emit('send',message);
      messageInput.value='';
  })
  

const Name = prompt("Enter your name to join ");
socket.emit('new-user-joined', Name);

socket.on('user-joined',Name=>{
 append(`${Name} joined the chat`,'left');
})

socket.on('recieve',data=>{
 append(`${data.name}: ${data.message}`,'left');
})
socket.on('left',Name=>{
 append(`${Name} left`,'left');
})