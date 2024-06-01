pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'my-node-app'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    }
    stages {
        stage('Build') {
            steps {
                script {
                    // Login to Docker Hub
                    sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                    // Build the Docker image
                    def app = docker.build("${DOCKER_IMAGE}:latest")
                    // Push the Docker image to Docker Hub
                    app.push()
                    // Logout from Docker Hub
                    sh "docker logout"
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Running Cypress Tests...'
                sh 'npm install'
                sh 'npx cypress run'
            }
        }
        stage('Code Quality Analysis') {
            steps {
                echo 'Running Code Quality Analysis...'
                script {
                    def scannerHome = tool 'SonarQube Scanner'
                    withSonarQubeEnv('My SonarQube Server') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Add your deployment commands here
            }
        }
        stage('Release') {
            steps {
                echo 'Releasing...'
                // Add your release commands here
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                echo 'Monitoring and Alerting...'
                // Add your monitoring and alerting commands here
            }
        }
    }
}
