async function handleData() {
  const data = await d3.json("data.json")
  console.log(data)
}

handleData()
