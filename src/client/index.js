const socket = io('/divecalc');
socket.on('divecalc', data=>{
    console.log(data)
})