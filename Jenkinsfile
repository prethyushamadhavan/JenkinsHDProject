pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'prethyusha/my-node-app'
        SONAR_PROJECT_KEY = 'my-node-app'
        SONAR_HOST_URL = 'http://localhost:9000'
        SONAR_LOGIN = credentials('11') // Credential ID for SonarQube token
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
        
        stage('Install Dependencies') {
            steps {
                script {
                    // Install npm dependencies including Cypress
                    bat 'npm install'
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    // Ensure npm global path exists
                    bat """
                    if not exist C:\\Users\\punya\\AppData\\Roaming\\npm mkdir C:\\Users\\punya\\AppData\\Roaming\\npm
                    """
                    // Run Cypress tests
                    bat 'npx cypress run'
                }
            }
        }
        
        stage('Code Quality Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarQube Scanner'
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
