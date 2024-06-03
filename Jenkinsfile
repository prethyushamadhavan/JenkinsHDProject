pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'prethyusha/my-node-app:latest'
        SONAR_PROJECT_KEY = 'my-node-app'
        SONAR_HOST_URL = 'http://localhost:9000'
        SONAR_LOGIN = credentials('11') // SonarQube token
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub-credentials'
    }
    stages {
        stage('Build') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS_ID, passwordVariable: 'DOCKERHUB_PSW', usernameVariable: 'DOCKERHUB_USR')]) {
                        echo "Docker Username: ${DOCKERHUB_USR}"
                        echo "Attempting Docker Login"
                        bat """
                        echo %DOCKERHUB_PSW% | docker login -u %DOCKERHUB_USR% --password-stdin
                        docker build -t ${DOCKER_IMAGE} .
                        docker push ${DOCKER_IMAGE}
                        docker logout
                        """
                    }
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    bat 'npm install'
                }
            }
        }
        
        stage('Install Cypress') {
            steps {
                script {
                    bat 'npm install cypress --save-dev'
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    bat """
                    echo Running Cypress Tests...
                    npx cypress run --spec 'cypress/e2e/**/*.cy.js'
                    if %ERRORLEVEL% neq 0 (
                        echo Cypress tests failed
                        exit /b 1
                    )
                    """
                }
            }
        }
        
        stage('Code Quality Analysis') {
            steps {
                script {
                    def scannerHome = tool name: 'SonarQube Scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv('My SonarQube Server') {
                        bat """
                        echo SonarQube Scanner Home: ${scannerHome}
                        echo Running SonarQube Scanner...
                        ${scannerHome}\\bin\\sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.sources=. -Dsonar.host.url=${SONAR_HOST_URL} -Dsonar.login=${SONAR_LOGIN} -X
                        """
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS_ID, passwordVariable: 'DOCKERHUB_PSW', usernameVariable: 'DOCKERHUB_USR')]) {
                        bat """
                        echo %DOCKERHUB_PSW% | docker login -u %DOCKERHUB_USR% --password-stdin
                        docker pull ${DOCKER_IMAGE}
                        docker run -d -p 8080:80 --name my-node-app ${DOCKER_IMAGE}
                        docker logout
                        """
                    }
                }
            }
        }
    }
}
