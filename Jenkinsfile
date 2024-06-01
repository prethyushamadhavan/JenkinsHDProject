pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'prethyusha/my-node-app'
    }
    stages {
        stage('Build') {
            steps {
                script {
                    // Login to Docker Hub using credentials stored in Jenkins
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKERHUB_PSW', usernameVariable: 'DOCKERHUB_USR')]) {
                        echo "Docker Username: ${DOCKERHUB_USR}"
                        echo "Attempting Docker Login"
                        bat """
                        echo %DOCKERHUB_PSW% | docker login -u %DOCKERHUB_USR% --password-stdin
                        docker build -t ${DOCKER_IMAGE}:latest .
                        docker push ${DOCKER_IMAGE}:latest
                        docker logout
                        """
                    }
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    bat 'npm install'
                    bat 'npx cypress run'
                }
            }
        }
        stage('Code Quality Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarQube Scanner'
                    withSonarQubeEnv('My SonarQube Server') {
                        bat "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Add your deployment commands here
                    echo 'Deploying...'
                }
            }
        }
        stage('Release') {
            steps {
                script {
                    // Add your release commands here
                    echo 'Releasing...'
                }
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                script {
                    // Add your monitoring and alerting commands here
                    echo 'Monitoring and Alerting...'
                }
            }
        }
    }
}
