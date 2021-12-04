async function handleData() {
  const payload = await d3.json("payload.json")
  const contributions = payload.data.user.contributionsCollection.contributionCalendar.weeks

  const svg = d3.select("#svg").attr("width", 740).attr("height", 400)
  const chartContainer = svg.append("g")

  const chartPath = chartContainer
    .selectAll("g.chartPath")
    .data(contributions)
    .enter()
    .append("g")
    .classed("chartPath", true)
    .attr("transform", (d, i) => `translate(${i * 14}, 0)`)

  const weeklyGroups = chartPath
    .selectAll("rect")
    .data((d, i, j) => {
      return d.contributionDays
    })
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i * 13)
    .attr("width", 10)
    .attr("height", 10)
    .attr("rx", 2)
    .attr("ry", 2)
    .attr("style", "shape-rendering: geometricPrecision")
    .attr("style", "outline: 1px solid rgba(27, 31, 35, 0.06)")
    .attr("style", "outline-offset: -1px; border-radius: 2px")

    .attr("fill", (d) => d.color)
}

handleData()
