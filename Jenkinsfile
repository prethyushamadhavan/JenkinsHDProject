pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-node-app'
        SONARQUBE_URL = 'http://localhost:9000'
        SONARQUBE_TOKEN = 'squ_fec78446cff9d7006cf3058bb320c20f35aefccb'
        CYPRESS_CACHE_FOLDER = 'C:\\CypressCache'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Verify Docker Setup') {
            steps {
                script {
                    bat 'docker --version'
                    bat 'docker ps'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}")
                }
            }
        }
        stage('Print Working Directory') {
            steps {
                script {
                    bat 'echo %CD%'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Verify Cypress Installation') {
            steps {
                bat 'npx cypress verify'
            }
        }
        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }
        stage('Run Cypress Tests') {
            steps {
                script {
                    bat 'dir cypress/e2e'  // List contents to verify the test file is present
                    bat 'npx cypress run --config baseUrl=http://localhost:3000'
                }
            }
        }
        stage('Code Quality Analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        bat """
                            sonar-scanner \
                            -Dsonar.projectKey=my-node-app \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=${SONARQUBE_URL} \
                            -Dsonar.login=${SONARQUBE_TOKEN}
                        """
                    }
                }
            }
        }
        stage('Deploy to Test Environment') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}").run('-d -p 3000:3000')
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            emailext(
                to: "prethyushamadhavan@gmail.com",
                subject: "Jenkins Build Successful: ${env.JOB_NAME} ${env.BUILD_NUMBER}",
                body: """<p>Good news!</p>
                        <p>The Jenkins build for <strong>${env.JOB_NAME} ${env.BUILD_NUMBER}</strong> was successful.</p>
                        <p>Check the details <a href="${env.BUILD_URL}">here</a>.</p>"""
            )
        }
        failure {
            echo 'The pipeline has failed.'
        }
    }
}
