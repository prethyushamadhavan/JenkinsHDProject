pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'prethyusha/my-node-app'
        SONAR_PROJECT_KEY = 'my-node-app' // Use the project key you created
        SONAR_HOST_URL = 'http://localhost:9000'
        SONAR_LOGIN = credentials(11) // Use the correct credential ID for SonarQube token
    }
    stages {
        stage('Build') {
            steps {
                script {
                    // Use Docker config for authentication
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
                    // Run Cypress tests
                    bat 'npm install'
                    bat 'npx cypress run'
                }
            }
        }
        stage('Code Quality Analysis') {
            steps {
                script {
                    def scannerHome = tool name: 'SonarQube Scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv('My SonarQube Server') {
                        bat """
                        ${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.sources=. -Dsonar.host.url=${SONAR_HOST_URL} -Dsonar.login=${SONAR_LOGIN}
                        """
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
