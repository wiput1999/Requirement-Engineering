import React from 'react';
import './dashboard.css';
import { Bar } from 'react-chartjs-2';

export class Dashboard
  extends React.Component {

  constructor() {
    super()
    this.state = {
      tasks: [
        {
          "title": "title",
          "detail": "detail"
        },
        {
          "title": "title",
          "detail": "detail"
        },
        {
          "title": "title",
          "detail": "detail"
        },
        {
          "title": "title",
          "detail": "detail"
        },
        {
          "title": "title",
          "detail": "detail"
        }
      ],
    }
  }

  render() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'July', 'July', 'July', 'July', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81, 56, 55, 40, 60, 70, 80, 90, 100]
        }
      ]
    };


    return (
      <div className="page__dashboard">
        <div className="title__dashboard">
          My Dashboard
        </div>
        <div className="graph__dashboard">
          <Bar
            data={data}
            width={100}
            height={50}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
        <div className="tasks__dashboard">
          {
            this.state.tasks.map(
              task => this.renderTask(task.title, task.detail)
            )
          }
        </div>
      </div>
    )
  }

  renderTask(title, detail) {
    return (
      <div className="task__dashboard">
        <div className="task_title">
          Task no. {title}
        </div>
        <div className="task_detail">
          Detail: {detail}
        </div>
      </div>
    )
  }
}

export default Dashboard