pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'prethyusha/my-node-app'
        SONAR_PROJECT_KEY = 'my-node-app'
        SONAR_HOST_URL = 'http://localhost:9000'
    }
    stages {
        stage('Build') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKERHUB_TOKEN', usernameVariable: 'DOCKERHUB_USR')]) {
                        echo "Docker Username: ${DOCKERHUB_USR}"
                        echo "Attempting Docker Login"
                        bat """
                        echo %DOCKERHUB_TOKEN% | docker login -u %DOCKERHUB_USR% --password-stdin
                        docker build -t ${DOCKER_IMAGE}:latest .
                        docker push ${DOCKER_IMAGE}:latest
                        docker logout
                        """
                    }
                }
            }
        }
        stage('Prepare Environment') {
            steps {
                script {
                    bat 'powershell -Command "if (-Not (Test-Path -Path \\"cypress\\reports\\")) { New-Item -ItemType Directory -Path \\"cypress\\reports\\" }"'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    bat 'npm install'
                    bat 'npm run test'
                    bat 'npm run merge-reports'
                    bat 'npm run generate-report'
                }
            }
        }
        stage('Code Quality Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarQube Scanner'
                    withCredentials([string(credentialsId: '11', variable: 'SONAR_LOGIN')]) {
                        withSonarQubeEnv('My SonarQube Server') {
                            bat """
                            ${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.sources=. -Dsonar.host.url=${SONAR_HOST_URL} -Dsonar.login=%SONAR_LOGIN%
                            """
                        }
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying...'
                }
            }
        }
        stage('Release') {
            steps {
                script {
                    echo 'Releasing...'
                }
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                script {
                    echo 'Monitoring and Alerting...'
                }
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'cypress/reports/*.json, cypress/reports/index.html', allowEmptyArchive: true
            junit 'cypress/reports/junit/*.xml' // Ensure this path matches the JUnit report output
        }
    }
}
