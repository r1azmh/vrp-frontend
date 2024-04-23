# VRP Solutions - FrontEnd
This is a project affiliated with University of Vaasa, Finland.
#### Project Title: [Optimising distribution transport in the food ecosystem](https://www.uwasa.fi/en/elintarvike-ekosysteemi)
#### Principal Investigator: [Professor Petri Helo](https://www.uwasa.fi/en/person/1041808)
This is the frontend of the [VRP Solutions Project](https://github.com/r1azmh/vrp-backend). The objective is to develop a user-friendly VRP Solver with a straightforward user interface, implementing an efficient algorithm.
## How to install
1. Download and Install NodeJS: Download NodeJS from this [link](https://nodejs.org/en/download) and install in your computer.
2. Install Package Manager:
```shell
npm install -g yarn
```
3. Clone and Run
* Choose the project directory: Open the Command Prompt and go to the desired location of your computer where you want to download the project.
```shell
cd C:\your-location
```
* Clone the repository to your computer:
```shell
git clone https://github.com/r1azmh/vrp-frontend.git
```
* Install required packages:
```shell
yarn install
```
* Link with Backend:
Download and set up backend from this [link](https://github.com/r1azmh/vrp-backend) then go to C:\your-location\vrp-frontend\src\components\constants.js and change apiBaseUrl
```shell
const apiBaseUrl = YOUR_BASE_URL
```
For example, if your backend is running on LocalHost on 8000 port, you should write
```shell
const apiBaseUrl = "http://localhost:8000"
```
* Run the project:
```shell
yarn start
```
## How to Use
1. Initiate a New Work
2. Add Jobs
3. Add Vehicles
4. Run the Solver to get the Solution
## Contact
In case of any issues or inquiries, please contact us at [riaz.mahmud@uwasa.fi](mailto:riaz.mahmud@uwasa.fi).

## License

Apache License
Version 2.0, January 2004

Copyright © 2024 Petri Helo and Riaz Mahmud.

Licensed under the Apache License, Version 2.0; you may not use this file except in compliance with the License. You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0). Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
