pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'prethyusha/my-node-app'
        DOCKER_TAG = 'latest' // Use 'latest' tag
        SONAR_PROJECT_KEY = 'my-node-app'
        SONAR_HOST_URL = 'http://localhost:9000'
        SONAR_LOGIN = credentials('11') // SonarQube token
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub-credentials'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS_ID, passwordVariable: 'DOCKERHUB_PSW', usernameVariable: 'DOCKERHUB_USR')]) {
                        echo "Docker Username: ${DOCKERHUB_USR}"
                        echo "Attempting Docker Login"
                        bat """
                        echo %DOCKERHUB_PSW% | docker login -u %DOCKERHUB_USR% --password-stdin
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        docker logout
                        """
                    }
                }
            }
        }
        
        stage('Push Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS_ID, passwordVariable: 'DOCKERHUB_PSW', usernameVariable: 'DOCKERHUB_USR')]) {
                        echo "Attempting Docker Login for Push"
                        bat """
                        echo %DOCKERHUB_PSW% | docker login -u %DOCKERHUB_USR% --password-stdin
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
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
                        ${scannerHome}\\bin\\sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.sources=. -Dsonar.host.url=${SONAR_HOST_URL} -Dsonar.login=${SONAR_LOGIN} -Dsonar.inclusions=Website.html
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
                        echo Stopping existing container...
                        docker stop my-node-app || true
                        docker rm my-node-app || true

                        echo %DOCKERHUB_PSW% | docker login -u %DOCKERHUB_USR% --password-stdin
                        docker pull ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker run -d -p 8081:80 --name my-node-app ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker logout
                        """
                    }
                }
            }
        }
        
        stage('Release') {
            steps {
                script {
                    echo "Releasing application... Tools like Octopus Deploy or AWS CodeDeploy can be used for this stage."
                }
            }
        }
        
        stage('Monitoring and Alerting') {
            steps {
                script {
                    echo "Setting up Monitoring and Alerting... Tools like Datadog or New Relic can be used for this stage."
                }
            }
        }
    }
    
    post {
        success {
            emailext(
               subject: "SUCCESS: Jenkins Pipeline  #${env.BUILD_NUMBER}",
                body: '''<html>
                            <body>
                         <p>The Pipeline build has completed successfully.</p>
                         <p>Check console output at <a href="${BUILD_URL}console">here</a> to view the full results.</p>
                            </body>
                          </html>''',
                to: 'prethyushamadhavan@gmail.com',
                replyTo: 'notification@jenkins.com',
                mimeType: 'text/html',
                attachLog: true
            )
        }
        always {
            archiveArtifacts artifacts: 'console.log', allowEmptyArchive: true
            emailext(
               subject: "BUILD: Jenkins Pipeline  #${env.BUILD_NUMBER}",
                body: '''<html>
                            <body>
                         <p>The Pipeline build has completed.</p>
                         <p>Check console output at <a href="${BUILD_URL}console">here</a> to view the full results.</p>
                            </body>
                          </html>''',
                to: 'prethyushamadhavan@gmail.com',
                replyTo: 'notification@jenkins.com',
                mimeType: 'text/html',
                attachmentsPattern: 'console.log'
            )
        }
    }
}
