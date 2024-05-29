pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-node-app'
        SONARQUBE_URL = 'http://localhost:9000'
        SONARQUBE_TOKEN = 'your-sonarqube-token-here'
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
                    docker.build(DOCKER_IMAGE)
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside {
                        bat 'npm install'
                        bat 'npm test'
                    }
                }
            }
        }
        stage('Run Cypress Tests') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside {
                        bat 'npx cypress run'
                    }
                }
            }
        }
        stage('Code Quality Analysis') {
            steps {
                script {
                    docker.image('sonarsource/sonar-scanner-cli').inside {
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
        }
        stage('Deploy to Test Environment') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE).run('-d -p 3000:3000')
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
