const url="http://localhost:3000/todos"
const output=document.getElementById("output")

function handleRequest(method){
  const id=document.getElementById("todoId").value
  const text=document.getElementById("todoText").value
  const completed=document.getElementById("todoCompleted").checked
  switch(method){
    case "GET":
      fetch(url)
      .then(res=>res.json())
      .then(data=>{
        output.textContent=JSON.stringify(data,null,2)
      })
      break;

    case "POST":
      fetch(url,{
        "method":"POST",
        "headers":{
          "content-type":"application/json"
        },
        "body":JSON.stringify({
          todo:text || "Default Task",completed
        })
      })
      .then(res=>res.json())
      .then(data=>{
        output.textContent=`POSTED:${JSON.stringify(data,null,2)}`
      })
      break
    
    case "PUT":
      fetch(`http://localhost:3000/todos/${id}`,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({id:id,todo:text,completed:completed})
      })
      .then(res=>res.json())
      .then(data=>{
        output.textContent=`PUT Updated: ${JSON.stringify(data,null,2)}`
      })
      break;
    
    case "PATCH":
      fetch(`http://localhost:3000/todos/${id}`,{
        method:"PATCH",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({todo:text,completed:completed})
      })
      .then(res=>res.json())
      .then(data=>{
        output.textContent=`PATCH Updated:${JSON.stringify(data,null,2)}`
      })
      break;
    
    case "DELETE":
      fetch(`http://localhost:3000/todos/${id}`,{
        method:"DELETE"
      })
      .then(res=>{
        if(res.ok){
          output.textContent=`Deleted todo with id: ${id}`
        }
      })
      break;
    
    default:
      output.textContent="Invalid Method"
  }
}